import { useState } from "react";
import { motion } from "framer-motion";
import HeroSkillsData from "../data/heroSkillsData.json";
import "./Proficiencies.css";

const Proficiencies = () => {
  const [loadedSkills, setLoadedSkills] = useState({});

  const handleSkillLoad = (skill) => {
    setLoadedSkills(prev => ({ ...prev, [skill]: true }));
  };

  const getSkillName = (skill) => {
    const names = {
      js: 'JavaScript',
      ts: 'TypeScript',
      claude: 'Claude AI',
      mcp: 'MCP',
      nextjs: 'Next.js',
      nodejs: 'Node.js',
      mongodb: 'MongoDB',
      html: 'HTML',
      css: 'CSS',
      react: 'React',
      tailwind: 'Tailwind',
      firebase: 'Firebase',
      github: 'GitHub',
      figma: 'Figma',
      cloudflare: 'Cloudflare',
      jest: 'Jest',
      php: 'PHP',
      wordpress: 'WordPress',
      postman: 'Postman',
      webpack: 'Webpack'
    };
    return names[skill] || skill;
  };

  const getSkillSrc = (skill) => {
    if (skill === 'claude') {
      return `${import.meta.env.BASE_URL}assets/claude-ai-icon.svg`;
    }
    if (skill === 'mcp') {
      return `${import.meta.env.BASE_URL}assets/mcp-server-stroke-rounded.svg`;
    }
    return `https://skillicons.dev/icons?i=${skill}`;
  };

  return (
    <section className="proficiencies-section">
      <div className="proficiencies-container">
        <motion.div
          className="proficiencies-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="proficiencies-heading select-none">
            Proficiencies
          </h3>
          <p className="proficiencies-subtext select-none">
            Technologies and tools I work with
          </p>
        </motion.div>

        <motion.div
          className="proficiencies-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {HeroSkillsData.skills.map((skill, index) => (
            <motion.div
              key={skill}
              className="proficiency-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="proficiency-icon-wrapper">
                {!loadedSkills[skill] && skill !== 'claude' && skill !== 'mcp' && (
                  <div className="skeleton skeleton-proficiency-icon"></div>
                )}
                <img
                  src={getSkillSrc(skill)}
                  alt={skill}
                  loading="lazy"
                  onLoad={() => handleSkillLoad(skill)}
                  style={{
                    display: loadedSkills[skill] || skill === 'claude' || skill === 'mcp' ? 'block' : 'none',
                    filter: skill === 'mcp' ? 'brightness(0) invert(1)' : 'none'
                  }}
                  className="proficiency-icon select-none"
                />
              </div>
              <span className="proficiency-name select-none">{getSkillName(skill)}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Proficiencies;
