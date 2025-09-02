import { ClipLoader } from 'react-spinners';

function Loading({ className }: { className?: string }) {
  return (
    <div className={`flex justify-center items-center h-full ${className? className : "py-36"}`} >
        <ClipLoader size={26} color="var(--color-light-wood)"/>
    </div>
  )
}

export default Loading;