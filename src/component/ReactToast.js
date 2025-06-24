import Toaster from 'react-hot-toast'
function ReactToast() {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: 'text-xs',
                duration: 5000,
                style: {

                },

                // Default options for specific types
                success: {
                    duration: 3000,
                    theme: {
                        primary: 'green',
                        secondary: '5E3F99',
                    },
                },
            }}
        />
    )
}

export default ReactToast