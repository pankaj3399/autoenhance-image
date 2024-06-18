import React from "react";

function Code(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
            <path fill="currentColor" d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75zm-6-20C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25H9z"></path>
            <path
                fill="currentColor"
                d="M9.6 15.78c-.19 0-.38-.07-.53-.22l-2.49-2.49c-.59-.59-.59-1.54 0-2.13l2.49-2.49c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L7.64 12l2.49 2.5c.29.29.29.77 0 1.06-.15.14-.34.22-.53.22zM14.4 15.78c-.19 0-.38-.07-.53-.22a.754.754 0 010-1.06l2.49-2.5-2.49-2.5a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.49 2.49c.59.59.59 1.54 0 2.13l-2.49 2.49c-.14.15-.34.23-.53.23z"
            ></path>
        </svg>
    );
}

export default React.memo(Code);
