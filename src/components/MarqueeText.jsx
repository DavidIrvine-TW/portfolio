import { motion } from 'framer-motion'

/*
  MarqueeText component:
  - Renders text with animated marquee scrolling effect
  - The text continuously scrolls from right to left in a seamless loop
  - Uses 4 overlapping spans at staggered positions for seamless infinite marquee
*/

const MarqueeText = ({ children, className = "" }) => {
  return (
    <p
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ minWidth: '150px', height: '2.5rem', display: 'inline-block', paddingBottom: '4px', margin: 0 }}
    >
      {/*
        Animated div 1:
        - Displays the text
        - Animates from starting position (0%) to moving left off-screen
        - The extra "•" is appended for visual separation between loops
      */}
      <motion.div
        className="absolute left-0 block whitespace-nowrap pointer-events-none"
        style={{ top: '10px', margin: 0 }}
        initial={{ x: '0%' }}
        animate={{ x: 'calc(-100% - 6px)' }}
        transition={{
          ease: 'linear',
          duration: 12,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {children} •
      </motion.div>

      {/*
        Animated div 2:
        - Positioned to create seamless loop
        - Starts offset to the left
      */}
      <motion.div
        className="absolute left-0 block whitespace-nowrap pointer-events-none"
        style={{ top: '10px', margin: 0 }}
        initial={{ x: 'calc(-100% - 6px)' }}
        animate={{ x: 'calc(-200% - 12px)' }}
        transition={{
          ease: 'linear',
          duration: 12,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {children} •
      </motion.div>

      {/*
        Animated div 3:
        - Starts off-screen to the right
        - Animates into view
      */}
      <motion.div
        className="absolute left-0 block whitespace-nowrap pointer-events-none"
        style={{ top: '10px', margin: 0 }}
        initial={{ x: 'calc(100% + 6px)' }}
        animate={{ x: '0%' }}
        transition={{
          ease: 'linear',
          duration: 12,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {children} •
      </motion.div>

      {/*
        Animated div 4:
        - Starts further right
        - Creates the continuous loop effect
      */}
      <motion.div
        className="absolute left-0 block whitespace-nowrap pointer-events-none"
        style={{ top: '10px', margin: 0 }}
        initial={{ x: 'calc(200% + 12px)' }}
        animate={{ x: 'calc(100% + 6px)' }}
        transition={{
          ease: 'linear',
          duration: 12,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {children} •
      </motion.div>
    </p>
  )
}

export default MarqueeText
