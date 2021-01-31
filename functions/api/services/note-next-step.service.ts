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
        this.setAWSConfig();

        this.topicArn = process.env.NEXTSTEP_AWS_SNS_TOPIC_ARN ?
            process.env.NEXTSTEP_AWS_SNS_TOPIC_ARN :
            process.env.AWS_SNS_TOPIC_ARN;

        this.sns = new AWS.SNS();
    }

    private setAWSConfig(): void {
        AWS.config.logger = console;

        const accessKeyId: string = process.env.NEXTSTEP_AWS_ACCESS_KEY_ID ?
            process.env.NEXTSTEP_AWS_ACCESS_KEY_ID :
            process.env.AWS_ACCESS_KEY_ID;

        const secretAccessKey = process.env.NEXTSTEP_AWS_SECRET_ACCESS_KEY ?
            process.env.NEXTSTEP_AWS_SECRET_ACCESS_KEY :
            process.env.AWS_SECRET_ACCESS_KEY;

        const region = process.env.NEXTSTEP_AWS_REGION ?
            process.env.NEXTSTEP_AWS_REGION :
            process.env.AWS_REGION;

        AWS.config.credentials = new AWS.Credentials({
            accessKeyId: accessKeyId, secretAccessKey: secretAccessKey
        });
    }

    public async publish(note: INote) {
        /*
                let snsMessage: any = new Object();
        
                // Required for SNS messages with a MessageStructure of 'json'
                snsMessage.default = '';
                snsMessage.payload = note;
        */
        const snsParams = {
            TopicArn: this.topicArn,
            Subject: `RubeGoldberg Note (${note.subject})`,
//          MessageStructure: 'json',
            Message: JSON.stringify(note)
        };

        try {
            let response = await this.sns.publish(snsParams).promise();

            console.log(
                `SNS Message sent; response =\n` + JSON.stringify(response)
            );

            return response;
        } catch (err) {
            console.error(err.stack);
            throw err;
        }
    }
}
