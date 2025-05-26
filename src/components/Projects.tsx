import Project from "../components/Project";
import project1 from "../assets/images/project1.webp";
import project2 from "../assets/images/project2.webp";
import project3 from "../assets/images/project3.webp";
import project4 from "../assets/images/project4.webp";

function Projects() {
    return (
        <section className="py-12 px-4 bg-my-white">
            <div className="max-w-[1300px] flex flex-col mx-auto gap-12">
                <div className="flex flex-col items-center mx-auto">
                    <h2 className="text-my-black font-Inria font-bold text-2xl md:text-3xl">Featured Projects</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-Inter">
                    <Project image={project1} name="Project CTU." location="Calgary, AB." style="Contemporary." description="A bold yet balanced redesign blending structured furniture, subtle texture, and dark-toned accents. This project challenged us to work with a more masculine palette while softening the overall mood." />
                    <Project image={project2} name="Modern Minimalist Condo." location="Vancouver, BC." style="Scandanavian Style." description="An airy loft layered with warm wood finishes, cozy textiles, and clean Scandinavian aesthetics. The goal was to make the open space feel more intimate while keeping it light andbreathable." />
                    <Project image={project3} name="Neutral Family Living Room." location="Mississauga, ON" style="Transitional" description="A timeless gathering space where comfort meets elegance. Neutral tones, plush seating, and subtle decorative detail. We carefully balanced formality with warmth to suit both everyday living and entertaining." />
                    <Project image={project4} name="Coastal-Inspired Home Office." location="Victoria, BC." style="Coastal." description="A fresh, light-filled workspace with oceanic blues, natural 
textures, and calming decor. The aim was to reflect the client’s love for the seaside without being overly themed. subtle, not literal." />
                </div>
            </div>
        </section>
    )
}

export default Projects