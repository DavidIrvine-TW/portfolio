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
    <section className="proficiencies-section hidden lg:block">
      <div className="proficiencies-container">
        <div className="proficiencies-grid">
          {HeroSkillsData.skills.map((skill, index) => (
            <motion.div
              key={skill}
              className="proficiency-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.05
              }}
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
        </div>
      </div>
    </section>
  );
};

export default Proficiencies;
