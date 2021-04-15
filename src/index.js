import barba from '@barba/core';



let animationEnter = (container) =>{
    // return gsap.from(container, {opacity: 0, duration: 1, clearProps: 'all'})
    const tl = gsap.timeline({defaults: {ease: 'power1.out'}});
            tl.to(".loadingCover", {x: "100%", duration: 1.5});
            tl.from(container, {opacity: 0, duration: 1}, "-=1")
            tl.set(".loadingCover", {x: "-100%"})
    return tl
}

let animationChange = (container) =>{
    const tl = gsap.timeline({defaults: {ease: 'power1.out'}});
            tl.to(".loadingCover", {x: "100%", duration: .8});
            tl.from(container, {opacity: 0, duration: .8}, "-=.8")
            tl.set(".loadingCover", {x: "-100%"})
    return tl
}
let animationLeave = (container, done) =>{
    const tl = gsap.timeline({defaults: {ease: 'power1.out'}});
            tl.to(".loadingCover", {x: "0%", duration: .8})
            tl.to(container, {opacity: 0, duration: .5 ,clearProps: 'all', onComplete: () => done()}, "-=.5");
            tl.set(window, {scrollTo: 0}, "-=.35")
    return tl
}


barba.init({
    transitions: [
        {
            once({next}){
                animationEnter(next.container);
            },
            leave({current}){
                const done = this.async()
                animationLeave(current.container, done)
            },
            enter({next}){
                animationChange(next.container);
            }
        }
    ],
    
});


