import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendFeedbackSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendFeedbackSpy}
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
       

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Teste',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSU',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendFeedbackSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feedback without type', async () => {


        await expect(submitFeedback.execute({
            type: '',
            comment: 'Teste',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSU',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without comment', async () => {


        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSU',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without as invalid screenshot', async () => {


        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Teste',
            screenshot: 'teste.jpg',
        })).rejects.toThrow();
    });
});