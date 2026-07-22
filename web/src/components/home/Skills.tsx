import styles from './skills.module.css'
import expertise from '@/src/data/expertise'

export default function Skills() {
  const isOpen = (label: string) => {
    return ['webbutveckling', 'kodredigerare', 'paradigm'].includes(label.toLowerCase())
  }

  return (
    <section id="skills" className="home-section">
      <div className={`${styles.skills} flex flex-col gap-6 reveal`}>
        <h2 className={`text-xs text-(--warm-soft) tracking-wider! uppercase font-mono! font-medium!`}>Verktygslådan</h2>
        <div className={`${styles['skills-groups']}`}>
          {expertise.map(field => (
            <details key={field.label} open={isOpen(field.label)} name={field.label} className={`flex flex-col gap-2 group`} style={{ gridArea: field.label.toLowerCase() }}>
              <summary className="flex items-center gap-2 list-none font-mono! text-xs font-medium tracking-wider! text-(--ink-faint) cursor-pointer">
                <i className='fa fa-arrow-right text-(--warm) group-open:rotate-90' aria-hidden="true" />
                <span>{field.label}</span>
              </summary>
              <ul className={`${styles['skill-tags']} flex flex-wrap gap-2`}>
                {field.skills.map((skill) => (<li key={skill.name} className='font-body font-medium text-xs text-(--paper) bg-white/5 border border-white/10 py-1.5 px-3 rounded-full'>{skill.name}</li>))}
              </ul>
            </details>
          ))
          }
        </div>
      </div>
    </section>
  )
}
