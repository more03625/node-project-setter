import * as fs from 'fs';

const addGitIgnoreFile = async () => {
    // Check if .gitignore file exists
    const gitignorePath = `.gitignore`;
    if (!fs.existsSync(gitignorePath)) {
        // Create .gitignore file if it doesn't exist
        const gitignoreContent = '/dist\n/node_modules\npackage-lock.json\n';
        fs.writeFileSync(gitignorePath, gitignoreContent);
        console.log(`File '.gitignore' created successfully.`);
    } else {
        console.log(`File '.gitignore' already exists. Skipping creation.`);
    }
}

const addTsConfigFile = async () => {
    // Check if tsconfig.json file exists
    const tsConfigPath = `tsconfig.json`;
    if (!fs.existsSync(tsConfigPath)) {
        // Create tsconfig.json file if it doesn't exist
        const tsConfigContent = `{
 "compilerOptions": {
     "target": "es2016",
     "module": "commonjs",
     "outDir": "./dist",
     "rootDir": ".",
     "strict": true
 }
}`;
        fs.writeFileSync(tsConfigPath, tsConfigContent);
        console.log(`File 'tsconfig.json' created successfully.`);
    } else {
        console.log(`File 'tsconfig.json' already exists. Skipping creation.`);
    }

}

const setUp = async () => {
    try {
        const rootFolder = 'src';

        await addGitIgnoreFile();
        await addTsConfigFile();
        // Check if the root folder (src) exists
        if (!fs.existsSync(rootFolder)) {
            // Create the root folder if it doesn't exist
            fs.mkdirSync(rootFolder);
            console.log(`Folder '${rootFolder}' created successfully.`);
        }

        const folders = ['constants', 'controllers', 'db', 'interfaces', 'models', 'routes', 'schema', 'utils'];

        folders.forEach(async (value) => {
            // Check if the folder already exists
            const folder = 'src' + "/" + value;

            if (!fs.existsSync(folder)) {
                // Create the folder
                fs.mkdirSync(folder);

                // Create and write to the index.ts file
                const filePath = `${folder}/index.ts`;
                const fileContent = `// Your controller logic goes here\nconsole.log('${value} Initialized');\n`;

                fs.writeFileSync(filePath, fileContent);

                console.log(`Folder '${value}' and file 'index.ts' created successfully.`);
            } else {
                console.log(`Folder '${value}' already exists. Aborting operation.`);
            }
        });
    } catch (error) {
        console.log("error =======>", error);
    }
}

setUp()