import GitHubIcon from '@mui/icons-material/GitHub'
// import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { about } from '../../portfolio'
import './About.css'

const About = () => {
  // const { name, role, description, resume, social } = about
  const { name, role, social } = about


  return (
    <div className='about center'>
      {name && (
        <h1>
          Hi, I am <span className='about__name'>{name}</span>
        </h1>
      )}

      {role && <h2 className='about__role'>{role}</h2>}
      <p className='about__desc'>
        👨‍💻 Team leader of HarmoniTech<br />
        🚀 My Vision: Combination of AI and Blockchain<br />
        ✔ Tech: ML, AI, Smart Contract, Web3, Fullstack<br />
        💰 Coinbase: Btc ordinals, runes, Sei, Ethereum, Solana<br />
        🌐 Navigating the complexities of Blockchain & Smart Contracts to deliver decentralized excellence.<br />
        🛠 Committed to leading Web3 development, connecting the dots between next-gen technologies and practical applications.<br />
        🔗 Let&apos;s Innovate Together: Partner with me and step into a world where intelligent automation meets the immutability of Blockchain.<br />
      </p>

      <div className='about__contact center'>
        {/* {resume && (
          <a href={resume}>
            <span type='button' className='btn btn--outline'>
              Resume
            </span>
          </a>
        )} */}

        {social && (
          <>
            {social.github && (
              <a
                href={social.github}
                aria-label='github'
                className='link link--icon'
              >
                <GitHubIcon />
              </a>
            )}

            {/* {social.linkedin && (
              <a
                href={social.linkedin}
                aria-label='linkedin'
                className='link link--icon'
              >
                <LinkedInIcon />
              </a>
            )} */}

            {social.whatsapp && (
              <a
                href={social.whatsapp}
                aria-label='whatsapp'
                className='link link--icon'
              >
                <WhatsAppIcon />
              </a>
            )}

            {social.discord && (
              <a
                href={social.discord}
                aria-label='discord'
                className='link link--icon'
              >
                <SportsEsportsIcon />
              </a>
            )}

            {social.telegram && (
              <a
                href={social.telegram}
                aria-label='telegram'
                className='link link--icon'
              >
                <TelegramIcon />
              </a>
            )}

            {social.twitter && (
              <a
                href={social.twitter}
                aria-label='twitter'
                className='link link--icon'
              >
                <TwitterIcon />
              </a>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default About
