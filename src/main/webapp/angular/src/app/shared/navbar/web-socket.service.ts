import {Injectable} from "@angular/core";
import {Message} from "../../model/Message";

@Injectable({
    providedIn:"root"
})
export class WebSocketService{
    webSocket: WebSocket;
    // chatMessages: Message[] = [];
    chatMessages: string[] = [];

    constructor() { }

    public openWebSocket(username:string){
        console.log(!this.webSocket);
        // console.log(this.webSocket.readyState===WebSocket.CLOSED);
            if(!this.webSocket ){
                this.webSocket = new WebSocket(`ws://localhost:8080/message/${username}`);
            }
        console.log(this.webSocket.readyState!==1);
            if(this.webSocket.readyState===0){
                this.webSocket.onopen = (event) => {
                    console.log('Open: ', event);
                    console.log(this.webSocket.readyState);
                };
            }


            this.webSocket.onmessage = (event) => {
                const chatMessageDto = event.data;
                console.log("push data")
                console.log(chatMessageDto)
                this.chatMessages.push(chatMessageDto);
            };

            this.webSocket.onclose = (event) => {
                console.log('Close: ', event);
            };


    }

    public sendMessage(chatMessageDto: string){
        // this.webSocket.send(JSON.stringify(chatMessageDto);
        this.webSocket.send(chatMessageDto);
    }

    public closeWebSocket() {
        if(this.webSocket && this.webSocket.readyState===1){
            this.webSocket.close();

        }
    }
}
