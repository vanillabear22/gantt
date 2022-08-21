import { createSVG } from './svg_utils';

export default class Arrow {
    constructor(gantt, from_task, to_task) {
        this.gantt = gantt;
        this.from_task = from_task;
        this.to_task = to_task;

        this.calculate_path();
        this.draw();
    }

    calculate_path() {
        let start_x =
            this.from_task.$bar.getX() + this.from_task.$bar.getWidth(); // from start to end  // from start to start
        //    this.from_task.$bar.getX();  // from end to end

        const condition = () =>
            this.to_task.$bar.getX() < start_x + this.gantt.options.padding &&
            start_x > this.from_task.$bar.getX() + this.gantt.options.padding;

        // while (condition()) {
        //     start_x -= 10;
        // }

        const start_y =
            this.gantt.options.header_height +
            this.gantt.options.bar_height +
            (this.gantt.options.padding + this.gantt.options.bar_height) *
            this.from_task.task._index +
            this.gantt.options.padding
            - this.from_task.$bar.getHeight() / 2;

        //const end_x = this.to_task.$bar.getX() - this.gantt.options.padding / 2; // to END
        const end_x = this.to_task.$bar.getX() + this.to_task.$bar.getWidth(); // to START
        const end_y =
            this.gantt.options.header_height +
            this.gantt.options.bar_height / 2 +
            (this.gantt.options.padding + this.gantt.options.bar_height) *
            this.to_task.task._index +
            this.gantt.options.padding;

        const from_is_below_to =
            this.from_task.task._index > this.to_task.task._index;
        const curve = this.gantt.options.arrow_curve;
        const clockwise = from_is_below_to ? 1 : 0;
        const curve_y = from_is_below_to ? -curve : curve;
        const offset = from_is_below_to
            ? end_y + this.gantt.options.arrow_curve
            : end_y - this.gantt.options.arrow_curve;

        // FROM START TO END // // FROM END TO END

        // from start to end    
        // this.path = `
        // M ${start_x} ${start_y}
        // a ${curve} ${curve} 0 0 1 ${curve} ${curve}
        // V ${offset}
        // a ${curve} ${curve} 0 0 ${clockwise} ${curve} ${curve_y}
        // L ${end_x} ${end_y}
        // m -5 -5
        // l 5 5
        // l -5 5`;

        //from end to end
        // this.path = `
        //     M ${start_x} ${start_y}
        //     a ${curve} ${curve} 0 0 0 -${curve}  ${curve}
        //     V ${offset}
        //     a ${curve} ${curve} 0 0 ${clockwise} ${curve} ${curve_y}
        //     L ${end_x} ${end_y}
        //     m -5 -5
        //     l 5 5
        //     l -5 5`;

        // if (
        //     this.to_task.$bar.getX() <
        //     //this.from_task.$bar.getX() + this.gantt.options.padding + 20 //from start to end
        //     this.from_task.$bar.getX() + this.gantt.options.padding //from end to end
        // ) {
        //     const down_1 = this.gantt.options.padding - curve;
        //     const down_2 =
        //         this.to_task.$bar.getY() +
        //         this.to_task.$bar.getHeight() / 2 -
        //         curve_y;
        //     const left = this.to_task.$bar.getX() - this.gantt.options.padding;

        // from start to end
        // this.path = `
        // M ${start_x} ${start_y}
        // a ${curve} ${curve} 0 0 1 ${curve} ${curve}
        // v ${down_1}
        // a ${curve} ${curve} 0 0 1 -${curve} ${curve}
        // H ${left}
        // a ${curve} ${curve} 0 0 ${clockwise} -${curve} ${curve_y}
        // V ${down_2}
        // a ${curve} ${curve} 0 0 ${clockwise} ${curve} ${curve_y}
        // L ${end_x} ${end_y}
        // m -5 -5
        // l 5 5
        // l -5 5`;

        // from end to end 
        // this.path = `
        //     M ${start_x} ${start_y}
        //     a ${curve} ${curve} 0 0 0 -${curve}  ${curve}
        //     v ${down_1}
        //     a ${curve} ${curve} 0 0 1 -${curve} ${curve}
        //     H ${left}
        //     a ${curve} ${curve} 0 0 ${clockwise} -${curve} ${curve_y}
        //     V ${down_2}
        //     a ${curve} ${curve} 0 0 ${clockwise} ${curve} ${curve_y}
        //     L ${end_x} ${end_y}
        //     m -5 -5
        //     l 5 5
        //     l -5 5`;


        // }

        // FROM START TO START

        const down_1 = this.gantt.options.padding - curve;
        const down_2 =
            this.to_task.$bar.getY() +
            this.to_task.$bar.getHeight() / 2 -
            curve_y;
        let right = this.to_task.$bar.getX() + this.to_task.$bar.getWidth() + this.gantt.options.padding / 2;

        this.path = `
                    M ${start_x} ${start_y}
                    a ${curve} ${curve} 0 0 1 ${curve} ${curve}
                    v ${down_1}
                    a ${curve} ${curve} 0 0 1 -${curve} ${curve}
                    H ${right}
                    a ${curve} ${curve} 0 0 ${clockwise} -${curve} ${curve_y}
                    V ${down_2}
                    a ${curve} ${curve} 0 0 1 -${curve} ${curve_y}
                    L ${end_x} ${end_y}
                    // m -5 -5
                    // l -5 5
                    // l 5 5`;

        if (
            this.to_task.$bar.getX() + this.to_task.$bar.getWidth() >
            this.from_task.$bar.getX() + this.from_task.$bar.getWidth()
        ) {
            this.path = `
                    M ${start_x} ${start_y}
                    a ${curve} ${curve} 0 0 1 ${curve} ${curve}
                    v ${down_1}
                    a ${curve} ${curve} 0 0 0 ${curve} ${curve}
                    H ${right - 10}
                    a ${curve} ${curve} 0 0 1 ${curve} ${curve_y}
                    V ${down_2}
                    a ${curve} ${curve} 0 0 1 -${curve} ${curve_y}
                    L ${end_x} ${end_y}
                    // m -5 -5
                    // l -5 5
                    // l 5 5`;
        }

    draw() {
        this.element = createSVG('path', {
            d: this.path,
            'data-from': this.from_task.task.id,
            'data-to': this.to_task.task.id,
        });
    }

    update() {
        this.calculate_path();
        this.element.setAttribute('d', this.path);
    }
}
