import { useEffect } from "react"

export default function useOutsideClick(ref,exceptionId, cb) {
    useEffect(() => {
        function handleOutsideClick(e) {
            if(ref.current && !ref.current.contains(e.target) && e.target.id !== exceptionId){
                cb();
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [ref, cb])
}