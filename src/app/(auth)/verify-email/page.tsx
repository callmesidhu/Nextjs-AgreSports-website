'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/app/supabase/supabaseClient'

export default function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Verifying your email...')
  const [isResendingEmail, setIsResendingEmail] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    async function checkVerificationStatus() {
      // Check for error parameters in the URL (from Supabase redirect)
      const error = searchParams.get('error')
      const errorCode = searchParams.get('error_code')
      const errorDescription = searchParams.get('error_description')
      
      // Handle errors from Supabase auth redirect
      if (error) {
        setVerificationStatus('error')
        
        if (errorCode === 'otp_expired') {
          setMessage('Your verification link has expired. Please request a new verification email.')
        } else {
          setMessage(errorDescription?.replace(/\+/g, ' ') || 'Verification failed. Please try again.')
        }
        return
      }

      // Normal verification flow
      try {
        const accessToken = searchParams.get('access_token')
        const refreshToken = searchParams.get('refresh_token')
        const type = searchParams.get('type')

        if (type !== 'email_confirmation' || !accessToken) {
          setVerificationStatus('error')
          setMessage('Invalid verification link. Please try registering again.')
          return
        }

        // Set session with the tokens provided in the URL
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        })

        if (error) {
          throw error
        }

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          throw new Error('Could not retrieve user information')
        }
        
        // Set email for potential resend
        setEmail(user.email || '')

        // Update user metadata to indicate email is confirmed
        const { error: updateError } = await supabase.auth.updateUser({
          data: { email_confirmed: true }
        })

        if (updateError) {
          throw updateError
        }

        setVerificationStatus('success')
        setMessage('Email verified successfully! You can now log in.')
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push('/loginPage')
        }, 3000)
        
      } catch (error) {
        console.error('Verification error:', error)
        setVerificationStatus('error')
        setMessage('Failed to verify your email. Please try again or contact support.')
      }
    }

    checkVerificationStatus()
  }, [searchParams, router])

  const handleResendVerification = async () => {
    if (!email) {
      setMessage('Please enter your email address to resend the verification link.')
      return
    }

    setIsResendingEmail(true)
    
    try {
      // Request OTP for email verification
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`
        }
      })
      
      if (error) throw error
      
      setMessage(`A new verification email has been sent to ${email}. Please check your inbox.`)
    } catch (error) {
      console.error('Error resending verification email:', error)
      setMessage('Failed to resend verification email. Please try again or contact support.')
    } finally {
      setIsResendingEmail(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {verificationStatus === 'loading' && (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Verifying Your Email</h2>
            <p className="text-gray-600">Please wait while we confirm your email address...</p>
          </div>
        )}

        {verificationStatus === 'success' && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Email Verified</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting you to login page...</p>
          </div>
        )}

        {verificationStatus === 'error' && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            
            {/* Resend verification section */}
            <div className="mt-2 mb-4 w-full">
              {searchParams.get('error_code') === 'otp_expired' && (
                <>
                  <div className="mb-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <button
                    onClick={handleResendVerification}
                    disabled={isResendingEmail || !email}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                      isResendingEmail || !email ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                    } transition-colors mb-4`}
                  >
                    {isResendingEmail ? 'Sending...' : 'Resend Verification Email'}
                  </button>
                </>
              )}
            </div>
            
            <button
              onClick={() => router.push('/register')}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Return to Registration
            </button>
          </div>
        )}
      </div>
    </div>
  )
}