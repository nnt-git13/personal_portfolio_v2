<div align="center">
  <br />
  <h1>Nathan's Portfolio</h1>
  <p>Computer Architecture & Systems Engineering Portfolio</p>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=React&logoColor=black" />
    <img src="https://img.shields.io/badge/-Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/-Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
    <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  </div>
</div>

## 🚀 About

A modern, interactive portfolio website showcasing projects, research, and engineering contributions in computer architecture, GPU systems, robotics, and machine learning. Built with React, Three.js, and Framer Motion, featuring immersive 3D visualizations, smooth animations, and a compute-themed design aesthetic.

## ✨ Features

- **Interactive 3D GPU Model**: Explore a detailed 3D GPU visualization with orbit controls
- **Terminal-Inspired Interface**: Linux boot sequence and terminal-style animations
- **Execution Trace Timeline**: Compact, grid-based visualization of projects and experiences
- **Progressive Background**: Seamless transition from architecture-themed to starfield backgrounds
- **Responsive Design**: Fully responsive across all device sizes
- **Smooth Animations**: Framer Motion-powered animations throughout
- **Contact Form**: Integrated EmailJS contact form with 3D Earth visualization

## 🛠️ Tech Stack

- **React** - UI framework
- **Three.js / React Three Fiber** - 3D graphics and visualizations
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **EmailJS** - Contact form integration

## 📦 Installation

**Prerequisites**

- Node.js (v18 or higher)
- npm or yarn

**Clone the repository**

```bash
git clone <repository-url>
cd personal_portfolio
```

**Install dependencies**

```bash
npm install
```

**Run development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── About.jsx          # About me section with tabs
│   ├── Contact.jsx        # Contact form with 3D Earth
│   ├── Hero.jsx           # Hero section with terminal animations
│   ├── Timeline.jsx       # Compact execution trace timeline
│   ├── KernelVisualization.jsx  # Terminal interface
│   ├── FeatureCards.jsx   # Feature cards section
│   ├── NavBar.jsx         # Navigation bar
│   ├── GlobalBackground.jsx  # Progressive background system
│   ├── canvas/            # 3D components (GPU, Earth, Stars)
│   └── timeline/          # Timeline sub-components
├── constants/             # Constants and configuration
├── data/                  # Data files (skills, timeline)
└── styles/                # Global styles
```

## 🎨 Design Philosophy

The portfolio is designed with a computer architecture and systems engineering theme, featuring:

- **Dark, minimal aesthetic** with cyan/teal accent colors
- **Terminal-inspired UI elements** (monospace fonts, command-line aesthetics)
- **Compute pipeline metaphors** (data buses, instruction pipelines, GPU threads)
- **Smooth, premium animations** inspired by Apple/NVIDIA design language
- **Progressive visual storytelling** through scroll-linked animations

## 📝 Sections

1. **Hero** - Introduction with terminal typing animation
2. **Terminal** - Interactive kernel visualization
3. **About** - Bio, skills, classes, and positions with 3D GPU model
4. **Feature Cards** - Key focus areas
5. **Execution Trace** - Compact timeline of projects and experiences
6. **Contact** - Contact form with 3D Earth visualization

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with your EmailJS credentials:

```env
# EmailJS Configuration
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=template_i5wtcxk
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key

# Social Links (for footer buttons)
VITE_GITHUB_URL=https://github.com/yourusername
VITE_LINKEDIN_URL=https://linkedin.com/in/yourprofile
```

**Note**: The template ID `template_i5wtcxk` (Auto-Reply template) is already configured. You just need to add your Service ID and Public Key.

### EmailJS Setup

The contact form sends emails to **nnt@mit.edu**. To set up EmailJS:

1. **Sign up** for a free account at [https://www.emailjs.com/](https://www.emailjs.com/)

2. **Create an Email Service**:
   - Go to Email Services and add a new service (Gmail, Outlook, etc.)
   - Follow the setup instructions for your email provider
   - Copy the Service ID

3. **Create an Email Template**:
   - Go to Email Templates and create a new template
   - Set the recipient email to: `nnt@mit.edu`
   - Use these template variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email address
     - `{{to_email}}` - Recipient email (nnt@mit.edu)
     - `{{reply_to}}` - Reply-to email (sender's email)
     - `{{message}}` - Message content
     - `{{subject}}` - Email subject line
   - Copy the Template ID

4. **Get your Public Key**:
   - Go to Account > API Keys
   - Copy your Public Key

5. **Add credentials to `.env`**:
   - Copy `.env.example` to `.env` (if it exists) or create a new `.env` file
   - Fill in your Service ID, Template ID, and Public Key

**Note**: Make sure your EmailJS template has the recipient email set to `nnt@mit.edu` in the template settings.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Nathan** - Computer Architecture & Systems Engineering

---

Built with ❤️ using React, Three.js, and modern web technologies.
