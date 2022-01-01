export default function Modal(props) {
  const { id, label, title, text, closeBtn, saveBtn, save } = props;
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby={label}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={label}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">{text}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {closeBtn}
            </button>
            <button
              type="submit"
              data-bs-dismiss="modal"
              className="btn btn-primary"
              onClick={save}
            >
              {saveBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
