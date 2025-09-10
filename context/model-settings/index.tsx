'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ModalState {
  doctorInfoModal: boolean
  [key: string]: boolean
}

interface ModalData {
  [key: string]: any
}

interface ModalContextType {
  modals: ModalState
  toggleModal: (modalName: string, data?: any) => void
  closeAllModals: () => void
  updateModalData: (modalName: string, data: any) => void
  modalData: ModalData
  closeModal: (modalName: string) => void
  openModal: (modalName: string, data?: any) => void
}

// Create the ModalContext
const initialValue: ModalContextType = {
  modals: {
    doctorInfoModal: false
  },
  toggleModal: () => {},
  closeAllModals: () => {},
  updateModalData: () => {},
  modalData: {},
  closeModal: () => {},
  openModal: () => {}
}

const ModalContext = createContext<ModalContextType>(initialValue)

// Custom hook for consuming the context
export const useSettingModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a SettingModalProvider')
  }
  return context
}

interface SettingModalProviderProps {
  children: ReactNode
}

// Modal provider component
export const SettingModalProvider = ({
  children
}: SettingModalProviderProps) => {
  const [modals, setModals] = useState<ModalState>({
    doctorInfoModal: false
  })
  const [modalData, setModalData] = useState<ModalData>({})

  const toggleModal = (modalName: string, data?: any) => {
    setModals(prev => {
      const updated = { ...prev, [modalName]: !prev[modalName] }
      Object.keys(updated).forEach(key => {
        if (key !== modalName) updated[key] = false
      })
      return updated
    })
    if (data) {
      setModalData(prev => ({ ...prev, [modalName]: data }))
    }
  }

  const openModal = (modalName: string, data?: any) => {
    setModals(prev => {
      const updated = { ...prev, [modalName]: true }
      return updated
    })
    if (data) {
      setModalData(prev => ({ ...prev, [modalName]: data }))
    }
  }

  const updateModalData = (modalName: string, data: any) => {
    setModalData(prev => ({
      ...prev,
      [modalName]: prev[modalName] ? { ...prev[modalName], ...data } : data
    }))
  }

  const closeAllModals = () => {
    setModals(
      Object.keys(modals).reduce<ModalState>(
        (acc, key) => ({ ...acc, [key]: false }),
        { doctorInfoModal: false }
      )
    )
  }

  const closeModal = (modalName: string) => {
    setModalData(prev => ({ ...prev, [modalName]: null }))
    setModals(prev => ({ ...prev, [modalName]: false }))
  }

  return (
    <ModalContext.Provider
      value={{
        modals,
        toggleModal,
        closeAllModals,
        updateModalData,
        modalData,
        closeModal,
        openModal
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
