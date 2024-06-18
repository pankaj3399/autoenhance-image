import React from "react";

const DocumentUploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
        <path
            d="M17.083 8.492h-2.408a3.588 3.588 0 0 1-3.583-3.584V2.5a.836.836 0 0 0-.834-.833H6.725c-2.567 0-4.642 1.666-4.642 4.641v7.384c0 2.975 2.075 4.641 4.642 4.641h6.55c2.567 0 4.642-1.666 4.642-4.641V9.325a.836.836 0 0 0-.834-.833Zm-7.475 2.783a.618.618 0 0 1-.441.183.618.618 0 0 1-.442-.183l-.6-.6v3.492a.63.63 0 0 1-.625.625.63.63 0 0 1-.625-.625v-3.492l-.6.6a.629.629 0 0 1-.883 0 .629.629 0 0 1 0-.883l1.666-1.667a.892.892 0 0 1 .184-.125c.016-.008.041-.017.058-.025.05-.017.1-.025.158-.033h.067c.067 0 .133.016.2.041h.017a.552.552 0 0 1 .183.125c.008.009.017.009.017.017l1.666 1.667a.629.629 0 0 1 0 .883Z"
            fill="currentColor"
        />
        <path d="M14.525 7.342c.792.008 1.892.008 2.833.008.475 0 .725-.558.392-.892-1.2-1.208-3.35-3.383-4.583-4.616-.342-.342-.934-.109-.934.366v2.909c0 1.216 1.034 2.225 2.292 2.225Z" fill="currentColor" />
    </svg>
);

export default React.memo(DocumentUploadIcon);