

import classes from './about.module.scss'


const About = () => {

    const about = (
        <section className={classes.about}>
            <div className='container'>
                <div className={classes.col}>
                    <div className={classes.header}>
                        <h1 className='title'>О системе</h1>
                        <p className='disc'>Здесь мы постарались описать основные сведения о нашей системе.</p>
                    </div>
                    <h2 className='subtitle'>Презентация проекта</h2>
                    <iframe src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FCGZnkXPIPCoflVHyhuCYvS%2FIT-Solutions-2023%3Fpage-id%3D403%253A62%26type%3Ddesign%26node-id%3D403-63%26viewport%3D1222%252C798%252C0.07%26scaling%3Dscale-down-width%26starting-point-node-id%3D403%253A510" allowfullscreen></iframe>
                </div>
            </div>
        </section>
    )

    return about
}

export default About