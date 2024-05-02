

 function InputBox({label ,placeholder, onChange}) {
  return (
    <div>
      <div className="text-sm  hover:text-lg  font-medium text-left py-2">{label}</div>
      <input placeholder={placeholder} onChange={onChange} className="w-full border border-slate-300 hover:border-slate-500 rounded px" type="text"></input>
    </div>
  )
}
export default InputBox;