// External Imports
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'

// Internal Imports
import { GET_COMPANIES, CompanyType } from '@client/graphql'
import { ComapniesOverviewTable } from './components/CompaniesOverviewTable'
import { AddNewCompanyModal } from './components/Modal/AddNewCompanyModal'
import { ComapniesInvestemetGraph } from './components/ComapniesInvestemetGraph'
import { ComapniesSectors } from './components/CompaniesSectors'

// Component Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 200px 100px 200px;
`
const LoadingDiv = styled.div`
  text-align: center;
`

// Component

export const Page: React.FC = () => {
  const { loading, error, data } = useQuery<{ companies: CompanyType[] }>(GET_COMPANIES)
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(prev => !prev)
  }

  // ...loading
  if (loading) {
    return <LoadingDiv>Loading data...</LoadingDiv>
  }

  if (error) {
    return (
      <span>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </span>
    )
  }

  const companies = data?.companies

  return (
    <Container>
      <ComapniesSectors companies={companies} />
      <ComapniesInvestemetGraph companies={companies} />
      <ComapniesOverviewTable companies={companies} openModal={openModal} />
      <AddNewCompanyModal showModal={showModal} setShowModal={setShowModal} />
    </Container>
  )
}
