'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab'
import Typography from '@mui/material/Typography'
import StarIcon from '@mui/icons-material/Star'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Card, CardContent } from '@mui/material'

const timelineData = [
  {
    year: '2012',
    title: 'lorem1',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur numquam mollitia exercitationem eaque minima sed officiis velit.`,
    icon: <StarIcon />,
  },
  {
    year: '2014',
    title: 'lorem2',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur numquam mollitia exercitationem eaque minima sed officiis velit.`,
    icon: <EmojiEventsIcon />,
  },
  {
    year: '2016',
    title: 'lorem3',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur numquam mollitia exercitationem eaque minima sed officiis velit.`,
    icon: <FlashOnIcon />,
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

export default function TimelineWithAnimation() {
  const theme = useTheme()
  const isMobile = useMediaQuery('(max-width: 395px)')

  return (
    <section className="relative text-white py-20 px-4 sm:px-10 md:px-16 lg:px-28 overflow-hidden">
      {/* Background dots */}
      <div
        className="absolute inset-0 opacity-30 z-0 animate-[dotsMove_10s_linear_infinite]"
        style={{
          backgroundImage: 'radial-gradient(#a903fc 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <style jsx>{`
        @keyframes dotsMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }
      `}</style>

      {/* Large Screen Timeline */}
      {!isMobile ? (
        <Timeline position="alternate" className="relative z-10" sx={{ padding: 0 }}>
          {timelineData.map((item, i) => (
            <TimelineItem key={i}>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align={i % 2 === 0 ? 'right' : 'left'}
                variant="body2"
                color="gray"
              >
                {item.year}
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineConnector
                  sx={{
                    height: '80px',
                    backgroundColor: '#a903fc',
                    width: '3px',
                  }}
                />
                {/* Centering the icon in the dot */}
                <TimelineDot
                  sx={{
                    backgroundColor: '#a903fc',
                    boxShadow: '0 0 10px #a903fc',
                    width: '40px',
                    height: '40px',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {React.cloneElement(item.icon, { sx: { color: 'white' } })}
                </TimelineDot>
                <TimelineConnector
                  sx={{
                    height: '80px',
                    backgroundColor: '#a903fc',
                    width: '3px',
                  }}
                />
              </TimelineSeparator>

              <TimelineContent sx={{ py: '40px', px: 2 }}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeInUp}
                >
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: '#aaa' }}>{item.description}</Typography>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      ) : (
        // Small Screen Card Layout
        <div className="flex flex-col gap-6 relative z-10">
          {/* Vertical line for mobile */}
          <div className="absolute left-[16px] top-0 bottom-0 w-[2px] bg-[#a903fc] opacity-50" />

          {timelineData.map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeInUp}
              className="relative"
            >
              {/* Timeline dot for mobile */}
              <div className="absolute left-[6px] top-6 w-5 h-5 bg-[#a903fc] rounded-full flex items-center justify-center z-10 shadow-[0_0_10px_#a903fc]">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>

              <Card
                sx={{
                  backgroundColor: '#1a1a1a',
                  borderLeft: '4px solid #a903fc',
                  borderRadius: '12px',
                  marginLeft: '32px',
                }}
                elevation={3}
              >
                <CardContent>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#a903fc]">{item.icon}</span>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                  </div>
                  <Typography variant="body2" sx={{ color: '#bbb' }}>
                    {item.description}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#888', display: 'block', marginTop: '8px' }}>
                    {item.year}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
