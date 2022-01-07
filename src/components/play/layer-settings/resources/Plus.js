import React from 'react'

export default function Plus({
    user,
    userColors,
    width,
    height
}) {
    return (
        <svg width={width || 24} height={height || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C11.2353 0 10.6154 0.619913 10.6154 1.38461V10.6154H1.38462C0.619913 10.6154 0 11.2353 0 12C0 12.7647 0.619913 13.3846 1.38461 13.3846H10.6154L10.6154 22.6154C10.6154 23.3801 11.2353 24 12 24C12.7647 24 13.3846 23.3801 13.3846 22.6154L13.3846 13.3846L22.6154 13.3846C23.3801 13.3846 24 12.7647 24 12C24 11.2353 23.3801 10.6154 22.6154 10.6154L13.3846 10.6154V1.38462C13.3846 0.619914 12.7647 0 12 0Z" fill={user && user.id && userColors[user.id]} />
        </svg>
    )
}
