import * as React from "react";
import {PHP, startPHP} from './php-wasm';
import {useContext, useEffect, useState} from "react";
import Select from "react-select";

const versions = ['5.6', '7.0', '7.1', '7.2', '7.3', '7.4', '8.0', '8.1', '8.2'] as const

type Version = typeof versions[number]


const options = versions.map((v)=> ({
    value: v,
    label: v,
}))

const PHPContext = React.createContext(null);

async function initPHP(v: Version) {
    // todo handling when load failed
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
    const [selectedValue, setSelectedValue] = useState(options[options.length - 1]);

    useEffect( function (){
        (async function() {
            setPHP(await initPHP(selectedValue.value))
        })()
    }, [selectedValue])

    if (php == null) {
        return (<> loading ... </>)
    }

    return (<div>
        <main>
            <label>PHP's Version:</label>
            <Select
                styles={{
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        color: "black",
                    })
                }}
                options={options}
                defaultValue={selectedValue}
                onChange={(option) => {
                    // null means loading.
                    setPHP(null)
                    setSelectedValue(option)
                }}
            />
            <PHPContext.Provider value={php}>
                <PhpInfo />
            </PHPContext.Provider>
        </main>
    </div>)
}
