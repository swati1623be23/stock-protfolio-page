const Skills = () => {
  const skills = ['React.js', 'Node.js', 'JavaScript', 'MongoDB', 'HTML/CSS', 'Git']

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2>Tech Stack</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills