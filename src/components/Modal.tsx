import { ClipLoader } from 'react-spinners'; 

type errorModalValues = {
    message: string,
    onClose: () => void,
    isSubmitting: boolean,
}

function Modal({ onClose, message, isSubmitting } : errorModalValues) {

    isSubmitting &&  <ClipLoader size={20} color="var(--color-light-wood)"/>

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded shadow-md max-w-md w-full max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Error</h2>
                <p>{message}</p>
                <div>
                    <button onClick={onClose} className="mt-4 text-mygreen font-semibold underline">
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;