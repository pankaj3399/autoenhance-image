import React from "react";

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 16 16" {...props}>
            <path
                fill="currentColor"
                d="M.833 7.4V4.6C.833 1.993 1.993.833 4.6.833h2.8c2.607 0 3.766 1.16 3.766 3.767v2.8c0 2.606-1.16 3.766-3.766 3.766H4.6c-2.607 0-3.767-1.16-3.767-3.766zm9.333-2.8c0-2.067-.7-2.767-2.766-2.767H4.6c-2.067 0-2.767.7-2.767 2.767v2.8c0 2.066.7 2.766 2.767 2.766h2.8c2.066 0 2.766-.7 2.766-2.766V4.6z"
            ></path>
            <path
                fill="currentColor"
                d="M4.833 11.4v-.734c0-.273.227-.5.5-.5H7.4c2.066 0 2.766-.7 2.766-2.766V5.333c0-.273.227-.5.5-.5h.734c2.607 0 3.766 1.16 3.766 3.767v2.8c0 2.606-1.16 3.766-3.766 3.766H8.6c-2.607 0-3.767-1.16-3.767-3.766zm1-.234v.234c0 2.066.7 2.766 2.767 2.766h2.8c2.066 0 2.766-.7 2.766-2.766V8.6c0-2.067-.7-2.767-2.766-2.767h-.234V7.4c0 2.606-1.16 3.766-3.766 3.766H5.833z"
            ></path>
        </svg>
    );
}

export default React.memo(CopyIcon);
