# Bill Reminder App

![Bill Reminder App Screenshot](https://cfgeifcecsxiephkyogp.supabase.co/storage/v1/object/sign/Images/bill-reminder-home.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvYmlsbC1yZW1pbmRlci1ob21lLnBuZyIsImlhdCI6MTY5MzkxNTA5OSwiZXhwIjoxNzI1NDUxMDk5fQ.Xl1jd_KUF5pBGUeODSJDxNu97oVE9brc7BcTVEa-PNs&t=2023-09-05T11%3A58%3A18.752Z)

See [live demo]()

## Overview

The Bill Reminder App is a web application built with Supabase and Next.js that helps users keep track of their bills and receive timely reminders through email when bills are due. This project provides a user-friendly interface for adding, managing, and receiving notifications for bills.

## Stack Used

- **Frontend:**  React(Next.js)
- **Backend:** Supabase (Database, Authentication, Edge functions)
- **Email Notifications:** Sendgrid API
- **Deployment:** Vercel

## Usage
- Sign up or log in to your account using Google or via a magic link.
- Add your bills, specifying the bill name, bill type, and due date

The Supabase Edge function will check the bills daily at midnight and send email reminders for due bills. Find the [edge function that sends reminders in this repo](https://github.com/remigathoni/supabase-edge-email-reminders).
