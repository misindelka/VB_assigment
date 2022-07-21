// External Imports
import { useRef, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'
import { useMutation } from '@apollo/client'
import { ADD_COMPANY, GET_COMPANIES } from '@client/graphql'

// Styled Types

interface IStyledProps {
  chancel: boolean
}

// Component Styles
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 300px;
`

const ModalWrapper = styled.div`
  width: 500px;
  height: 600px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.5);
  background: ${props => props.theme.colors.bg};
  z-index: 10;
  border-radius: 10px;
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  background: ${props => props.theme.colors.bgSecondary};
`

const HeaderLabel = styled.h2`
  margin: 0;
  padding: 0 20px 0 20px;
`

const HeaderText = styled.p`
  margin: 0;
  padding: 0 20px 0 20px;
  color: ${props => props.theme.colors.text};
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding-top: 10px;
  padding-left: 450px;
  z-index: 10;
  color: ${props => props.theme.colors.text};
`

const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 0 40px;
  background: ${props => props.theme.colors.bg};
  color: ${props => props.theme.colors.text};
  border-radius: 10px;
  box-sizing: border-box;
`

const StyledInput = styled.input`
  width: 95%;
  background: none;
  color: ${props => props.theme.colors.text};
  padding: 10px;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 5px;
  :focus {
    outline: none;
  }
`
const StyledSelect = styled.select`
  width: 100%;
  background: none;
  color: ${props => props.theme.colors.text};
  padding: 10px;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 5px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 30px;
`

const Button = styled.button<IStyledProps>`
  width: 120px;
  height: 30px;
  background: ${props => (props.chancel ? props.theme.colors.bg : 'green')};
  decoration: none;
  border-radius: 10px;
  border: none;
  color: white;
  margin: 10px;
`
const StyledInputLabel = styled.h5``

const initalState = {
  name: '',
  stage: '',
  sector: '',
  investmentSize: 0,
}

export const AddNewCompanyModal: React.FC = ({ showModal, setShowModal }: any) => {
  const modalRef = useRef()
  const [newComapny, setNewCompany] = useState(initalState)
  const stageConfig = [
    'Select stage from list',
    'Prototype',
    'Idea',
    'Series A',
    'Series B',
    'Series C',
    'Seed',
  ]
  const sectorConfig = ['Select sector from list', 'Fintech', 'Insutech', 'IOT', 'Roboadvisory']

  // fucntions
  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false)
    }
  }

  const handleEscapeKey = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false)
        setNewCompany(initalState)
      }
    },
    [setShowModal, showModal],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [handleEscapeKey])

  const handleInput = (e: any) => {
    const inputName = e.currentTarget.name
    const value = e.currentTarget.value
    const isInvestment = inputName === 'investmentSize'
    setNewCompany(prev => ({ ...prev, [inputName]: !isInvestment ? value : parseInt(value) }))
  }

  const [addCompany] = useMutation(ADD_COMPANY, {
    refetchQueries: [{ query: GET_COMPANIES }],
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setNewCompany(initalState)
    addCompany({
      variables: newComapny,
    })
    setShowModal((prev: any) => !prev)
  }

  return (
    <>
      {showModal ? (
        <Container
          onClick={closeModal}
          ref={modalRef as unknown as React.RefObject<HTMLDivElement>}
        >
          <ModalWrapper showModal={showModal}>
            <HeaderContainer>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev: any) => !prev)}
              />
              <HeaderLabel>Add new company</HeaderLabel>
              <HeaderText>
                Add new company by filling all the requiuLorem ipsum dolor sit amet, consectetur
                adipiscing elit. Fusce feu
              </HeaderText>
            </HeaderContainer>

            <ModalContent>
              <StyledForm onSubmit={handleSubmit}>
                <StyledInputLabel>Company name</StyledInputLabel>
                <StyledInput
                  type="text"
                  name="name"
                  required
                  placeholder="Company name"
                  onChange={handleInput}
                />
                <StyledInputLabel>Stage</StyledInputLabel>
                <StyledSelect name="stage" onChange={handleInput} required>
                  {stageConfig?.map(stage => (
                    <option>{stage}</option>
                  ))}
                </StyledSelect>
                <StyledInputLabel>Sector</StyledInputLabel>
                <StyledSelect name="sector" onChange={handleInput} required>
                  {sectorConfig?.map(sector => (
                    <option>{sector}</option>
                  ))}
                </StyledSelect>
                <StyledInputLabel>Investment size</StyledInputLabel>
                <StyledInput
                  type="text"
                  name="investmentSize"
                  placeholder="Enter amount"
                  onChange={handleInput}
                  required
                />
              </StyledForm>
            </ModalContent>
            <ButtonWrapper>
              <Button onClick={() => setShowModal((prev: any) => !prev)} chancel={true}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Add Company</Button>
            </ButtonWrapper>
          </ModalWrapper>
        </Container>
      ) : null}
    </>
  )
}
