import * as React from "react";
import {PHP, startPHP} from './php-wasm';
import {useContext, useEffect, useState} from "react";
import Select from "react-select";

const versions = ['7.4', '8.1', '8.2'] as const

type Version = typeof versions[number]


const options = versions.map((v)=> ({
    value: v,
    label: v,
}))

const PHPContext = React.createContext(null);

async function initPHP(v: Version) {
    // todo: switch version
    const PHPLoaderModule = await import(`./php-${v}.js`);
    return startPHP(PHPLoaderModule, "WEB", {});
}

async function runPHP(php: PHP, code: string) {
    const output = php.run({
        code: code
    });
    return (new TextDecoder().decode(output.body));
}

function PhpInfo() {
    const [result, setResult] = useState("")
    const php = useContext(PHPContext);
    useEffect( function (){
        (async function() {
            const info = await runPHP(php, "<?php phpinfo();")
            setResult(info)
        })()
    }, [php])

    return (<div
        dangerouslySetInnerHTML={{
        __html: result
    }}>
    </div>)
}

export default function () {
    const [php, setPHP] = useState<PHP|null>(null)
    const [version, serVersion] = useState<Version>(options[2].value)
    const [selectedValue, setSelectedValue] = useState(options[2]);

    useEffect( function (){
        (async function() {
            setPHP(await initPHP(version))
        })()
    }, [version])
    if (php == null) {
        return (<></>)
    }

    return (<div>
        <main>
            PHP's Version:
            <Select
                styles={{
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        color: "black",
                    })
                }}
                options={options}
                defaultValue={selectedValue}
                onChange={(value) => {
                    value ? serVersion(value.value) : null;
                }}
            />
            <PHPContext.Provider value={php}>
                <PhpInfo />
            </PHPContext.Provider>
        </main>
    </div>)
}
