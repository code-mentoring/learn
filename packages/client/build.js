const OSType = require('os').type( );
const colors = require('colors');
const exec   = require('child_process').exec;

colors.enabled = true;

//============================
//  
//============================
console.log( `Setting up project using ${OSType} configuration...`.yellow );
console.log( `build.js is running...`.yellow );

if( OSType === "Linux" ) 
    exec( 'echo `No one setup Linux Build yet`', execOutputCallback );

else if( OSType === "Darwin" )
    exec( 'yarn build-mac', execOutputCallback );

else if( OSType === "Windows_NT" )
    exec( 'npm run build-win', execOutputCallback );

else
    console.log( "Unsupported OS is found" );



function execOutputCallback( err, stdout, stderr ) {
    if( stdout ) console.log( `output: ${stdout}`.blue );
    if( stderr ) console.log( `${stderr}`.red );
    if( err ) console.log( `${err}`.red );
}