import React from 'react'

export default function Mute({
    fill
}) {
    return (
        <svg width={16} height={14} viewBox='0 0 16 14' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.3088 0.58485C8.04509 0.455108 7.72692 0.475126 7.48422 0.63823L2.62311 3.89663H1.7923C0.802791 3.89663 0 4.66173 0 5.60479V8.39534C0 9.3384 0.802791 10.1035 1.7923 10.1035H2.62311L7.48422 13.3619C7.72772 13.525 8.04509 13.545 8.30958 13.4145C8.57329 13.2841 8.73897 13.0246 8.73897 12.7414V1.25875C8.73897 0.975542 8.57252 0.715334 8.3088 0.58485ZM7.14584 11.2802L3.47959 8.82253C3.32945 8.67128 3.12175 8.58602 2.90394 8.58528H1.79232C1.68263 8.58528 1.59317 8.50002 1.59317 8.39549V5.60493C1.59317 5.50039 1.68263 5.41513 1.79232 5.41513H2.90394C3.12177 5.41439 3.32946 5.32913 3.47959 5.17789L7.14584 2.72023V11.2802Z" fill={fill || "white"} fillOpacity="0.9" />
            <path d="M9.9035 10.7338C10.0529 10.8761 10.2559 10.9562 10.4675 10.9562C10.6791 10.9562 10.8813 10.8761 11.0307 10.7338C12.07 9.74326 12.6534 8.40061 12.6534 7.00012C12.6534 5.59962 12.0699 4.25701 11.0307 3.26647C10.7187 2.96991 10.2139 2.97065 9.9027 3.26795C9.59154 3.56525 9.59232 4.04642 9.90348 4.34297C10.6409 5.04878 11.0556 6.00442 11.0556 7.0001C11.0556 7.99578 10.641 8.95138 9.90348 9.65723C9.75334 9.79958 9.66933 9.99307 9.66933 10.1955C9.66933 10.3971 9.75336 10.5907 9.9035 10.7338Z" fill={fill || "white"} fillOpacity="0.9" />
            <path d="M12.3431 1.17869C12.1937 1.32178 12.1097 1.51453 12.1097 1.71619C12.1097 1.91784 12.1937 2.1106 12.3431 2.25295C13.6632 3.51182 14.4046 5.21849 14.4046 6.99782C14.4046 8.77789 13.6633 10.4845 12.3431 11.7427C12.0319 12.04 12.0319 12.5204 12.3431 12.817C12.6542 13.1143 13.1591 13.1143 13.4703 12.817C15.0899 11.2734 16 9.1805 16 6.9971C16 4.81446 15.0899 2.72083 13.4703 1.17723C13.3209 1.03488 13.1179 0.954805 12.9063 0.955545C12.6955 0.955545 12.4924 1.03634 12.3431 1.17869Z" fill={fill || "white"} fillOpacity="0.9" />
        </svg>
    )
}