import React from 'react'
import { social } from './Icons'

const Socialbar = () => {
  return (
    <div className="social-icons">
      <ul className="links">
        {social.map((socials) => {
          const { id, url, icon } = socials
          return (
            <li key={id}>
              <a href={url}>{icon}</a>
            </li>
          )
        })}
      </ul>
    </div>
)
}

export default Socialbar