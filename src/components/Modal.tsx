import { ClipLoader } from 'react-spinners';

type errorModalValues = {
    message: string,
    onClose: () => void,
    isSubmitting: boolean,
}

function Modal({ onClose, message, isSubmitting }: errorModalValues) {


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded shadow-md max-w-md w-full max-h-[80vh] overflow-y-auto">
                {isSubmitting ? 
                <div className='flex justify-center'><ClipLoader size={20} color="var(--color-light-wood)"/></div> 
                :
                <div>
                    <p>{message}</p>
                    <div>
                        <button onClick={onClose} className="mt-4 text-mygreen font-semibold underline">
                            Close
                        </button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Modal;