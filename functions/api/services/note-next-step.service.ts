import { INote } from '../shared';
import AWS from 'aws-sdk';

/**
 * This class represents a business service for publishing Notes
 * to AWS, the next step in our Rube Goldberg Machine.
 *
 * @author Union Hills Software
 * @date   October 3, 2020
 *
 */

export class NoteNextStepService {
    private sns: AWS.SNS;
    private topicArn: string;

    constructor() {
        AWS.config.logger = console;
        this.topicArn = process.env.AWS_SNS_TOPIC_ARN;

        this.sns = new AWS.SNS();
    }

    public async publish(note: INote) {
        let snsMessage: any = new Object();

        // Required for SNS messages with a MessageStructure of 'json'
        snsMessage.default = '';
        snsMessage.payload = note;

        const snsParams = {
            TopicArn: this.topicArn,
            Subject: note.subject,
            MessageStructure: 'json',
            Message: JSON.stringify(snsMessage)
        };

        try {
            let response = await this.sns.publish(snsParams).promise();

            console.log(
                `SNS Message sent\nresponse =\n` + JSON.stringify(response)
            );

            return response;
        } catch (err) {
            console.error(err.stack);
            throw err;
        }
    }
}
