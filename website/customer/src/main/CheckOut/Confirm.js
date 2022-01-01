import "./Confirm.css";
export default function Confirm(props) {
  const {id, question, showConfirm, agree} = props;
  return (
    <div className="confirm" id={id}>
      <div className="confirm-question">{question}</div>
      <div className="confirm-button">
        <button className="btn-1" onClick={showConfirm}>Quay lại</button>
        <button className="btn-2" onClick={agree}>Đồng ý</button>
      </div>
    </div>
  );
}