/**
* extended blocks for sozoRobot
*/

enum CarDirection {
    //% block="forward" enumval=0
    CarForward,
    //% block="back" enumval=1
    CarBackward,
    //% block="turn right" enumval=2
    CarTurnRight,
    //% block="turn left" enumval=3
    CarTurnLeft
}

//% weight=112 color=#00A654 icon="\uf1b9" block="sozoRobot"

namespace sozoRobot {
    let leftPinSet = AnalogPin.P1
    let rightPinSet = AnalogPin.P2
    let leftSpeedSet = 20
    let rightSpeedSet = 20

    /**
    * initialization wheel pin
    * @param leftPin describe IO pin for left wheel, eg: AnalogPin.P1
    * @param rightPin describe IO pin for right wheel, eg: AnalogPin.P2
    */
    //% blockId=CCE_hamabit_wheel_pin
    //% block="set left wheel pin %leftPin| right wheel pin %rightPin"
    export function wheelPin(leftPin: AnalogPin, rightPin: AnalogPin): void {
        leftPinSet = leftPin
        rightPinSet = rightPin
    }

    /**
    * initialization wheel speed
    * @param leftSpeed describe servo power from 0(min) to 100(max) here, eg: 15
    * @param rightSpeed describe servo power from 0(min) to 100(max) here, eg: 15
    */
    //% blockId=CCE_hamabit_wheel_speed
    //% block="set left wheel speed %leftSpeed| right wheel speed %rightSpeed"
    //% leftSpeed.min=0 leftSpeed.max=100
    //% rightSpeed.min=0 rightSpeed.max=100
    //% leftSpeed.defl=20
    //% rightSpeed.defl=20
    export function wheelSpeed(leftSpeed: number, rightSpeed: number): void {
        leftSpeedSet = leftSpeed
        rightSpeedSet = rightSpeed
    }

    /**
    * Drives forwards. Call stop to stop
    */
    //% blockId=CCE_hamabit_servos_forward
    export function forward(powerCoefficient: number): void {
        let leftMoterPower = 9 * leftSpeedSet * (powerCoefficient / 100) + 1500
        let rightMoterPower = -9 * rightSpeedSet * (powerCoefficient / 100) + 1500
        if (leftMoterPower > 2400) {
            leftMoterPower = 2400
        }
        if (rightMoterPower < 600) {
            rightMoterPower = 600
        }
        pins.servoSetPulse(leftPinSet, leftMoterPower)
        pins.servoSetPulse(rightPinSet, rightMoterPower)
    }

    /**
    * Drives backwards. Call stop to stop
    */
    //% blockId=CCE_hamabit_servos_backward
    export function backward(powerCoefficient: number): void {
        let leftMoterPower = -9 * leftSpeedSet * (powerCoefficient / 100) + 1500
        let rightMoterPower = 9 * rightSpeedSet * (powerCoefficient / 100) + 1500
        if (leftMoterPower < 600) {
            leftMoterPower = 600
        }
        if (rightMoterPower > 2400) {
            rightMoterPower = 2400
        }
        pins.servoSetPulse(leftPinSet, leftMoterPower)
        pins.servoSetPulse(rightPinSet, rightMoterPower)
    }

    /**
    * Turns left. Call stop to stop
    */
    //% blockId=CCE_hamabit_servos_left
    export function left(powerCoefficient: number): void {
        let leftMoterPower = -9 * leftSpeedSet * (powerCoefficient / 100) + 1500
        let rightMoterPower = -9 * rightSpeedSet * (powerCoefficient / 100) + 1500
        if (leftMoterPower < 600) {
            leftMoterPower = 600
        }
        if (rightMoterPower < 600) {
            rightMoterPower = 600
        }
        pins.servoSetPulse(leftPinSet, leftMoterPower)
        pins.servoSetPulse(rightPinSet, rightMoterPower)
    }

    /**
    * Turns right. Call stop to stop
    */
    //% blockId=CCE_hamabit_servos_right
    export function right(powerCoefficient: number): void {
        let leftMoterPower = 9 * leftSpeedSet * (powerCoefficient / 100) + 1500
        let rightMoterPower = 9 * rightSpeedSet * (powerCoefficient / 100) + 1500
        if (leftMoterPower > 2400) {
            leftMoterPower = 2400
        }
        if (rightMoterPower > 2400) {
            rightMoterPower = 2400
        }
        pins.servoSetPulse(leftPinSet, leftMoterPower)
        pins.servoSetPulse(rightPinSet, rightMoterPower)
    }

    /**
    * Drives forwards for requested time and then stops
    * @param duration describe forwarding time in millisecond, eg:500
    */
    //% blockId=CCE_hamabit_drive_forwards
    //% block="drive forward（ms） %duration"
    //% duration.shadow=timePicker
    //% duration.defl=1000
    export function driveForwards(duration: number): void {
        forward(100);
        basic.pause(duration);
        stop();
    }

    /**
    * Drives backwards for requested time and then stops
    * @param duration describe backwarding time in millisecond, eg:500
    */
    //% blockID=CCE_hamabit_drive_backwards
    //% block="drive backward（ms） %duration"
    //% duration.shadow=timePicker
    //% duration.defl=1000
    export function driveBackwards(duration: number): void {
        backward(100);
        basic.pause(duration);
        stop();
    }

    /**
    * Move turn right for requested time and then stops
    * @param duration describe turning time in millisecond, eg:500
    */
    //% blockID=CCE_hamabit_drive_rightturns
    //% block="turn right（ms） %duration"
    //% duration.shadow=timePicker
    //% duration.defl=1000
    export function turnRight(duration: number): void {
        right(100);
        basic.pause(duration);
        stop();
    }

    /**
    * Move turn left for requested time and then stops
    * @param duration describe turning time in millisecond, eg:500
    */
    //% blockID=CCE_hamabit_drive_leftturns
    //% block="turn left（ms） %duration"
    //% duration.shadow=timePicker
    //% duration.defl=1000
    export function turnLeft(duration: number): void {
        left(100);
        basic.pause(duration);
        stop();
    }

    /**
     * Run a car continuously
     * @param describe directon to turn the car in, eg: CarDirection.CarForward
     */
    //% blockID=CCE_hamabit_drive_continuous
    //% block="continuous drive | %direction"
    // expandableArgumentMode="toggle"
    export function continuousRun(direction: CarDirection) {
        switch (direction) {
            case CarDirection.CarForward:
                forward(100);
                break
            case CarDirection.CarBackward:
                backward(100);
                break
            case CarDirection.CarTurnRight:
                right(100);
                break
            case CarDirection.CarTurnLeft:
                left(100);
                break
            default:
                stop();
        }
    }

    /**
    * stop
    */
    //% blockID=CCE_hamabit_drive_stop
    //% block="stop"
    export function stop(): void {
        pins.digitalWritePin(<number>leftPinSet, 0)
        pins.digitalWritePin(<number>rightPinSet, 0)
    }

    /**
    * Forwards through the requested time and power then stops
    * @param duration in milliseconds to run the car, eg:500
    * @param powerAdjustment the factor of servo power adj　from 0 (min) to 200 (max), eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_forward
    //% block="drive forward（ms） %duration| power（％） %powerAdjustment"
    //% duration.shadow=timePicker
    //% powerAdjustment.min=0 powerAdjustment.max=200
    //% duration.defl=1000
    //% powerAdjustment.defl=80
    export function customForwards(duration: number, powerAdjustment: number): void {
        forward(powerAdjustment);
        basic.pause(duration);
        stop();
    }

    /**
    * Backwards through the requested time and power then stops
    * @param duration in milliseconds to run the car, eg:500
    * @param powerAdjustment the factor of servo power adj　from 0 (min) to 200 (max), eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_backward
    //% block="drive backward（ms） %duration| power（％） %powerAdjustmen"
    //% duration.shadow=timePicker
    //% powerAdjustment.min=0 powerAdjustment.max=200
    //% duration.defl=1000
    //% powerAdjustment.defl=80
    export function customBackwards(duration: number, powerAdjustment: number): void {
        backward(powerAdjustment);
        basic.pause(duration);
        stop();
    }

    /**
    * Turn right through the requested time and power then stops
    * @param duration in milliseconds to run the car, eg:500
    * @param powerAdjustment the factor of servo power adj　from 0 (min) to 200 (max), eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_rightTurn
    //% block="turn right（ms） %duration| power（％） %powerAdjustment"
    //% duration.shadow=timePicker
    //% powerAdjustment.min=0 powerAdjustment.max=200
    //% duration.defl=1000
    //% powerAdjustment.defl=80
    export function customRight(duration: number, powerAdjustment: number): void {
        right(powerAdjustment);
        basic.pause(duration);
        stop();
    }

    /**
    * Turn left through the requested time and power then stops
    * @param duration in milliseconds to run the car, eg:500
    * @param powerAdjustment the factor of servo power adj　from 0 (min) to 200 (max), eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_leftTurn
    //% block="turn left（ms） %duration| power（％） %powerAdjustment"
    //% duration.shadow=timePicker
    //% powerAdjustment.min=0 powerAdjustment.max=200
    //% duration.defl=1000
    //% powerAdjustment.defl=80
    export function customLeft(duration: number, powerAdjustment: number): void {
        left(powerAdjustment);
        basic.pause(duration);
        stop();
    }

}
