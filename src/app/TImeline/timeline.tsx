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
  TimelineOppositeContent
} from '@mui/lab'
import Typography from '@mui/material/Typography'
import StarIcon from '@mui/icons-material/Star'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import FlashOnIcon from '@mui/icons-material/FlashOn'


const timelineData = [
  {
    year: '2012',
    title: 'lorem1',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur numquam mollitia exercitationem eaque minima sed officiis velit. Vel, vitae! Ea impedit perferendis fugiat cupiditate ratione laborum culpa officia laudantium quis.`,
    icon: <StarIcon />,
  },
  {
    year: '2014',
    title: 'lorem2',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur numquam mollitia exercitationem eaque minima sed officiis velit. Vel, vitae! Ea impedit perferendis fugiat cupiditate ratione laborum culpa officia laudantium quis.`,
    icon: <EmojiEventsIcon />,
  },
  {
    year: '2016',
    title: 'lorem3',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur numquam mollitia exercitationem eaque minima sed officiis velit. Vel, vitae! Ea impedit perferendis fugiat cupiditate ratione laborum culpa officia laudantium quis.`,
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
  return (
      <section className="relative text-white py-20 px-4 md:px-16 overflow-hidden">
      {/* Grid background layer */}
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
      `}
      </style>
      <Timeline position="alternate">
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
              <TimelineConnector />
              <TimelineDot color="secondary">{item.icon}</TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeInUp}
              >
                <Typography variant="h6" component="span" sx={{ color: 'white' }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: '#aaa' }}>{item.description}</Typography>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </section>
  )
}
