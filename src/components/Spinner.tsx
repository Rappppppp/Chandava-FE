import Icon from "@components/Icon"



const Spinner = ({ color = "#fff" }: { color?: string }) => {
    return (

        <div className="flex items-center justify-center">
            <div className="animate-spin">
                <Icon name="LoaderCircle" size={20} color={color} />
            </div>
        </div>

    );
}

export default Spinner;