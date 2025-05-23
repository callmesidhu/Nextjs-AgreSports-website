'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
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
import { Shield, Sparkles } from 'lucide-react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { Timestamp } from 'firebase/firestore'

type IconType = 'star' | 'award' | 'flash' | 'shield' | 'sparkles'

interface JourneyItem {
  id: string
  year?: string
  title: string
  date: string
  description: string
  iconType: IconType
}

const iconMap = {
  star: <StarIcon sx={{ color: 'white' }} />,
  award: <EmojiEventsIcon sx={{ color: 'white' }} />,
  flash: <FlashOnIcon sx={{ color: 'white' }} />,
  shield: <Shield color="white" />,
  sparkles: <Sparkles color="white" />,
}

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
  const [timelineData, setTimelineData] = useState<JourneyItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const iconTypes: IconType[] = ['star', 'award', 'flash', 'shield', 'sparkles']

    const fetchTimeline = async () => {
      try {
        const q = query(collection(db, 'journey'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)

        const data: JourneyItem[] = snapshot.docs.map((doc) => {
          const d = doc.data()
          const createdAt: Timestamp | undefined = d.createdAt

          const year = createdAt
            ? new Date(createdAt.toMillis()).getFullYear().toString()
            : d.year || ''

          const formattedDate = d.date
            ? d.date
            : createdAt
            ? new Date(createdAt.toMillis()).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'No Date'

          const randomIcon = iconTypes[Math.floor(Math.random() * iconTypes.length)]

          return {
            id: doc.id,
            title: d.title || 'No Title',
            description: d.description || 'No Description',
            date: formattedDate,
            iconType: randomIcon,
            year,
          }
        })

        setTimelineData(data)
      } catch (error) {
        console.error('Error fetching journey data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTimeline()
  }, [])

  if (loading) {
    return (
      <section className="relative bg-black text-white py-20 px-4 sm:px-10 md:px-16 lg:px-28 overflow-hidden">
        <p className="text-center text-gray-400">Loading journey...</p>
      </section>
    )
  }

  return (
    <section className="relative bg-black text-white py-20 px-4 sm:px-10 md:px-16 lg:px-28 overflow-hidden">
      {/* Background dots */}
              <div className="absolute inset-0 opacity-30 z-0 dots-background" />

      <style jsx global>{`
        @keyframes dotsMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }
        
        .dots-background {
          background-image: radial-gradient(#a903fc 1px, transparent 1px);
          background-size: 20px 20px;
          animation: dotsMove 10s linear infinite;
        }
      `}</style>

      {/* Large Screen Timeline */}
      {!isMobile ? (
        <Timeline position="alternate" className="relative z-10" sx={{ padding: 0 }}>
          {timelineData.map((item, i) => (
            <TimelineItem key={item.id}>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align={i % 2 === 0 ? 'right' : 'left'}
                variant="body2"
                color="gray"
              >
                 <Typography variant="caption" sx={{ color: '#888' }}>
                    {item.date}
                  </Typography>
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineConnector
                  sx={{ height: '80px', backgroundColor: '#610bc6', width: '3px' }}
                />
                <TimelineDot
                  sx={{
                    backgroundColor: '#610bc6',
                    boxShadow: '0 0 10px #610bc6',
                    width: '40px',
                    height: '40px',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {iconMap[item.iconType]}
                </TimelineDot>
                <TimelineConnector
                  sx={{ height: '80px', backgroundColor: '#610bc6', width: '3px' }}
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
          <div className="absolute left-[16px] top-0 bottom-0 w-[2px] bg-[#610bc6] opacity-50" />

          {timelineData.map((item, i) => (
            <motion.div
              key={item.id}
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
                    <span className="text-[#a903fc]">{iconMap[item.iconType]}</span>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                  </div>
                  <Typography variant="body2" sx={{ color: '#bbb' }}>
                    {item.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: '#888', display: 'block', marginTop: '8px' }}
                  >
                    {item.date}
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
