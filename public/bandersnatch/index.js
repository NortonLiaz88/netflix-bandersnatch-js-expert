const MANIFEST_URL = 'manifest.json'
const localhost = ['127.0.0.1', 'localhost']

async function main() {
    console.log('MAIN')
    const isLocal = !!~localhost.indexOf(window.location.hostname)
    const manifestJSON = await (await fetch(MANIFEST_URL)).json()
    const host = isLocal ? manifestJSON.localHost : manifestJSON.productionHost
    console.log(`IS LOCAL: ${host}`)

    const videoComponent = new VideoComponent();

    const network = new Network({host});

    const videoPlayer = new VideoMediaPlayer({
        manifestJSON,
        network,
        videoComponent
    })
    videoPlayer.initializeCodec();
    videoComponent.initializePlayer();

    window.nextChunck = (data) => videoPlayer.nextChunck(data)
}

window.onload = main