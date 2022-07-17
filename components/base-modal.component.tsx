type Props = {
  id: string;
  title: string;
  body: string;
  dialogResult: (choose: boolean) => void;
};

export default function BaseModalComponent(props: Props) {
  return (
    <div
      className="modal fade"
      id={props.id}
      tabIndex={-1}
      aria-labelledby={`modalLabel${props.id}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`modalLabel${props.id}`}>
              {props.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => props.dialogResult(false)}
            ></button>
          </div>
          <div className="modal-body">{props.body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => props.dialogResult(false)}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => props.dialogResult(true)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
