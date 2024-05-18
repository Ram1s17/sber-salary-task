import { FC } from "react"
import { Spin } from "antd"

const LoadingSpinner: FC = () => {
    return (
        <Spin
            tip="Loading..."
            size="large"
            fullscreen
        >
            <div className="content" />
        </Spin>
    )
}

export default LoadingSpinner