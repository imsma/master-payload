'use client'

const ExportButton = () => {
  const handleExport = async () => {
    alert('Export functionality is not implemented yet.')
  }

  return (
    <button
      onClick={handleExport}
      style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Export Data
    </button>
  )
}

export default ExportButton
