import App from '../src/components/App.svelte';

// stub chrome api
Object.assign(window, {
    chrome: {
        runtime: {
            connect: function () {
                return {
                    onMessage: {
                        addListener: () => undefined
                    },
                    postMessage: () => undefined
                }
            }
        }
    }
});

describe("Render suite", function () {
    it("chrome api should be set up", function () {

        // test if we have stubbed chrome api
        expect(Object.keys(window)).toContain("chrome")
        expect(Object.keys(window.chrome)).toContain("runtime")
        // etc ...
    });

    it("app should not render", function () {
        let render = document.createElement("div")
        document.body.appendChild(render);

        let app = new App({target: render, props: {enabled: false}});
        expect(render.innerHTML).toBe("")
    });

    it("app should render", function () {
        let render = document.createElement("div")
        document.body.appendChild(render);

        let app = new App({target: render, props: {enabled: true}});

        expect(render.innerHTML).toContain("search-wrapper")
    });

    it("app should render after setting enable", async function () {
        let render = document.createElement("div")
        document.body.appendChild(render);

        let app = new App({target: render, props: {enabled: false}});

        expect(render.innerHTML).toBe("")
        await app.$$set({enabled: true})
        expect(render.innerHTML).toContain("search-wrapper")
    });
});
