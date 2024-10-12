<script lang="ts" module>
    type CountdownString = `${string}d ${string}h ${string}m ${string}s`;

    function getCountdown(date: Date): CountdownString {
        const now = new Date();
        let targetDate = new Date(now.getFullYear(), date.getMonth(), date.getDate());

        // If the target date is in the past, set it to the next year
        if (targetDate.getTime() < now.getTime()) {
            targetDate = new Date(now.getFullYear() + 1, date.getMonth(), date.getDate());
        }

        const delta = targetDate.getTime() - now.getTime();

        const dys = Math.floor(delta / (1000 * 60 * 60 * 24));
        const hrs = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((delta % (1000 * 60)) / 1000);

        return `${zPad(dys, 3)}d ${zPad(hrs, 2)}h ${zPad(mins, 2)}m ${zPad(secs, 2)}s`;
    }

    function zPad(num: number, size: number) {
        return num.toString().padStart(size, '0');
    }
</script>

<script lang="ts">
    type Props = {
        value: string | Date;
    };

    let { value }: Props = $props();
    const date = new Date(value);

    let countdown: CountdownString = $state(`000d 00h 00m 00s`);

    $effect.pre(() => {
        countdown = getCountdown(date);

        const interval = setInterval(() => {
            countdown = getCountdown(date);
        }, 1000);

        return () => clearInterval(interval);
    });
</script>

<span class="countdown">{countdown}</span>

<style>
    .countdown {
        font-family: monospace;
    }
</style>
