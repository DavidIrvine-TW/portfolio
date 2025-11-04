import React from "react";
import vapesterData from "../data/vapester.json";
import kanbanData from "../data/kanban.json";
import trailerviewData from "../data/trailerview.json";
import photosnapData from "../data/photosnap.json";

import SingleProject from "./SingleProject";
import "./Projects.css";


const Projects = () => {
  return (
    <section id="portfolio" className="projects-section  ">

      <div className="projects-container ">

        <div className="projects-header">
          <h3 className="projects-heading section-heading">
            PORTFOLIO
            <img
              src={`${import.meta.env.BASE_URL}assets/briefcase.png`}
              alt="briefcase icon"
              className="projects-icon"
            />
          </h3>
          <h4 className="projects-subheading section-subheading ">
            Featured projects
          </h4>
        </div>


        {/* trailerview */}
        {trailerviewData.map((data, index) => (
          <SingleProject
            name={data.name}
            nameIcon={data.nameIcon}
            nameIconAlt={data.nameIconAlt}
            tech={data.tech}
            tags={data.tags}
            blurb={data.blurb}
            github={data.github}
            livelink={data.livelink}
            key={data.id}
            images={data.images}
            align={data.align}
          />
        ))}


        {/* vapestore */}
        {vapesterData.map((data, index) => (
          <SingleProject
            name={data.name}
            nameIcon={data.nameIcon}
            nameIconAlt={data.nameIconAlt}
            tech={data.tech}
            tags={data.tags}
            blurb={data.blurb}
            github={data.github}
            livelink={data.livelink}
            key={data.id}
            images={data.images}
            align={data.align}
          />
        ))}
      

        {/* Kanban */}
        {kanbanData.map((data, index) => (
          <SingleProject
            name={data.name}
            nameIcon={data.nameIcon}
            nameIconAlt={data.nameIconAlt}
            tech={data.tech}
            tags={data.tags}
            blurb={data.blurb}
            github={data.github}
            livelink={data.livelink}
            key={data.id}
            images={data.images}
            align={data.align}
          />
        ))}




        {/* photosnap */}
        {photosnapData.map((data, index) => (
          <SingleProject
            name={data.name}
            nameIcon={data.nameIcon}
            nameIconAlt={data.nameIconAlt}
            tech={data.tech}
            tags={data.tags}
            blurb={data.blurb}
            github={data.github}
            livelink={data.livelink}
            key={data.id}
            images={data.images}
            align={data.align}
          />
        ))}

      </div>
      <div className="projects-divider"></div>
    </section>
  );
};

export default Projects;
