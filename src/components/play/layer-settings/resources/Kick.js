import React from 'react'

export default function Kick({
    fill
}) {
    return (
        <svg width={14} height={16} viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.5 7C13.5 8.88126 12.7008 10.5758 11.4234 11.7628L12.3587 12.6981C12.6516 12.991 12.6516 13.4659 12.3587 13.7588C12.0658 14.0516 11.5909 14.0516 11.298 13.7588L10.1989 12.6596C9.4605 13.0779 8.63211 13.3559 7.75 13.4572V14.5H9.25C9.66421 14.5 10 14.8358 10 15.25C10 15.6642 9.66421 16 9.25 16H4.75C4.33579 16 4 15.6642 4 15.25C4 14.8358 4.33579 14.5 4.75 14.5H6.25V13.4572C5.36764 13.3558 4.53903 13.0778 3.80044 12.6593L2.70098 13.7588C2.40808 14.0516 1.93321 14.0516 1.64032 13.7588C1.34742 13.4659 1.34742 12.991 1.64032 12.6981L2.57611 11.7623C1.29899 10.5754 0.5 8.88101 0.5 7C0.5 3.41015 3.41015 0.5 7 0.5C10.5899 0.5 13.5 3.41015 13.5 7ZM6.25 11.9441C5.74925 11.8688 5.27283 11.7192 4.83229 11.5069C4.39495 11.2962 3.99297 11.0237 3.6377 10.7007C2.63161 9.78609 2 8.46681 2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 8.51015 11.3305 9.86394 10.2721 10.7807C9.91676 11.0886 9.51754 11.3471 9.08511 11.5458C8.66783 11.7375 8.21961 11.8735 7.75 11.9441V10.8855C8.76428 10.567 9.5 9.61941 9.5 8.5C9.5 7.11929 8.38071 6 7 6C5.61929 6 4.5 7.11929 4.5 8.5C4.5 9.61941 5.23572 10.567 6.25 10.8855V11.9441ZM8 8.5C8 9.05228 7.55228 9.5 7 9.5C6.44772 9.5 6 9.05228 6 8.5C6 7.94772 6.44772 7.5 7 7.5C7.55228 7.5 8 7.94772 8 8.5Z" fill={fill || "white"} fillOpacity="0.9" />
        </svg>
    )
}