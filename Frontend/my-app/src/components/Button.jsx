

 export function Button({label, onClick}) {
    console.log("In the button compornt",onClick,label)
  return <div className="   mt-4">
    <button  onClick={onClick} type="button"  className="bg-gray-800  mb-2  hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 text-sm text-center  text-white w-full p-2 rounded-lg">{label}</button>
  </div>
}