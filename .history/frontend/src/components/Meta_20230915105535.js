import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Bienvenue a BeGood Events',
  description: 'Nous gerons les evenements teams',
  keywords: 'teams, microsoft azure, my-digital-school',
}

export default Meta
